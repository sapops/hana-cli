import {readDiBuilderJson} from "./readDiBuilder";
import {ServiceReplacement, XsaEnv} from "./XSAtypes";

export async function filterDiBuilder(
  mainService: ServiceReplacement  
): Promise<XsaEnv> {
  const {VCAP_SERVICES} = await readDiBuilderJson();

  return {
    VCAP_SERVICES: {
      hana: VCAP_SERVICES?.['hana']?.filter(({name}) => name === mainService.service),
    },
    SERVICE_REPLACEMENTS: [mainService],
  };
}
