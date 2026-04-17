import { internal } from "../_generated/api"
import { action } from "../_generated/server"
import { v } from "convex/values"
import { loadVapiTenantSecretRaw } from "../lib/vapiCredentials"
import { parseSecretString } from "../lib/secrets"


export const getVapiSecrets = action({
  args: {
    organizationID: v.string()
  },
  handler: async (
    ctx,
    args,
  ): Promise<{ publicApiKey: string } | null | undefined> => {
    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationID: args.organizationID,
        service: "vapi"
      }
    )
    if(!plugin) {
      return
    }

    const secret = await loadVapiTenantSecretRaw(
      ctx,
      args.organizationID,
      plugin.secretName,
    )
    if (secret === null) {
      return null
    }

    const secretData = parseSecretString<{
      privateApiKey: string,
      publicApiKey: string
    }>(secret)

    if(!secretData) {
      return null
    }

    if(!secretData.publicApiKey) {
      return null
    }

    if(!secretData.privateApiKey) {
      return null
    }

    return {
      publicApiKey: secretData.publicApiKey
    }
  }
})