import { ElementIds } from "business/monitoring/configurations/elements/element-ids";
import { FunnelConfiguration } from "business/monitoring/configurations/funnel-configuration";
import { requestViaBridge } from "components/smartapp";
import { ConfigurationsContext } from "infrastructure/configurations/configurations-context/configurations-context";
import { getFunnelState } from "infrastructure/equipment-indicators/funnel/funnel-data";
import { useContext, useEffect, useMemo, useState } from "react";

export const useFunnel = (id: typeof ElementIds[keyof typeof ElementIds]) => {
  const {configurations} = useContext(ConfigurationsContext);
  const configuration = useMemo(() => configurations.find((x) => x.elementId === id), [configurations, id]);
  // const weight = useTrendSubscription(configuration instanceof FunnelConfiguration ? configuration.stateTrend?.trendId : undefined);

  console.log('config', configuration);

  const [currentData, setCurrentData] = useState<any>();

  useEffect(() => {
    const update = () => {
      // setRand(new Decimal(Math.round(Math.random() * 5000)));

      if (configuration instanceof FunnelConfiguration) {
        requestViaBridge(`trends?trendIds=${configuration.stateTrend?.trendId}`).then(resp => setCurrentData(resp));
      } // TODO: why divide to 2
    }

    update();

    const timer = setInterval(update, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [configuration]);
  
  console.log('rudnik funnel data', currentData);

  return {
    state: currentData
  }
}