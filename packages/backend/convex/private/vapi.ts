"use node";

import { VapiClient, Vapi } from "@vapi-ai/server-sdk";
import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { loadVapiTenantSecretRaw } from "../lib/vapiCredentials";
import { parseSecretString } from "../lib/secrets";
import { ConvexError } from "convex/values";

export const getAssistants = action({
  args: {},

  handler: async (ctx): Promise<Vapi.Assistant[]> => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }

    const orgId = identity.orgId as string;

    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationID: orgId,
        service: "vapi"
      }
    )

    if (!plugin) {
      return []
    }

    const secretValueRaw = await loadVapiTenantSecretRaw(
      ctx,
      orgId,
      plugin.secretName,
    )
    if (secretValueRaw === null) {
      return []
    }
    const secretData = parseSecretString<{
      privateApiKey: string
      publicApiKey: string
    }>(secretValueRaw)

    if (!secretData?.privateApiKey || !secretData.publicApiKey) {
      return []
    }

    const vapiClient = new VapiClient({
      token: secretData.privateApiKey,
    })

    const assistants = await vapiClient.assistants.list()

    return assistants
  }
})

export const getPhoneNumbers = action({
  args: {},

  handler: async (ctx): Promise<Vapi.PhoneNumbersListResponseItem[]> => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }

    const orgId = identity.orgId as string;

    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationID: orgId,
        service: "vapi"
      }
    )

    if (!plugin) {
      return []
    }

    const secretValueRaw = await loadVapiTenantSecretRaw(
      ctx,
      orgId,
      plugin.secretName,
    )
    if (secretValueRaw === null) {
      return []
    }
    const secretData = parseSecretString<{
      privateApiKey: string
      publicApiKey: string
    }>(secretValueRaw)

    if (!secretData?.privateApiKey || !secretData.publicApiKey) {
      return []
    }

    const vapiClient = new VapiClient({
      token: secretData.privateApiKey,
    })

    const phoneNumbers = await vapiClient.phoneNumbers.list()

    return phoneNumbers
  }
})