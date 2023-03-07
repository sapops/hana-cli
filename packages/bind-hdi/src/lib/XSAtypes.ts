interface VcapService {
    name: string;
  }
  
  export interface ServiceReplacement {
    key: string;
    service: string;
  }
  
  type VcapServices = Record<string, VcapService[] | undefined>;
  
  export interface XsaEnv {
    VCAP_SERVICES?: VcapServices;
    SERVICE_REPLACEMENTS: ServiceReplacement[];
    TARGET_CONTAINER?: string;
  }
  