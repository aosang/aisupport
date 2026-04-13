import {
  HTML_SCRIPT,
  REACT_SCRIPT,
  NEXTJS_SCRIPT,
  JAVASCRIPT_SCRIPT,
  type IntegrationId
} from "./constants"

export const createScript = (
  integrationId: IntegrationId,
  organizationID: string
) => {
  if(integrationId === "html") {
    return HTML_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationID)
  }

  if(integrationId === "react") {
    return REACT_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationID)
  }

  if(integrationId === "nextjs") {
    return NEXTJS_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationID)
  }

  if(integrationId === "javascript") {
    return JAVASCRIPT_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationID)
  }

  return ""
  
}