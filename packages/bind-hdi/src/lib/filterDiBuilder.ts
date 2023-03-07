import {readXsaEnvJson} from "./readXsaEnvJson";
import {ServiceReplacement, XsaEnv} from "./XSAtypes";

export async function filterDiBuilder(
  mainService: ServiceReplacement  
): Promise<XsaEnv> {
  //read di-builder
  const {VCAP_SERVICES} = await readXsaEnvJson('di-builder');

  return {
    VCAP_SERVICES: {
      hana: VCAP_SERVICES?.['hana']?.filter(({name}) => name === mainService.service),
    },
    SERVICE_REPLACEMENTS: [mainService],
  };
}
