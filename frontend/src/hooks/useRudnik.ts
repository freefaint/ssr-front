import { ElementIds } from "business/monitoring/configurations/elements/element-ids";
import { MineBunkerConfiguration } from "business/monitoring/configurations/mine-bunker-configuration";
import { requestViaBridge } from "components/smartapp";
import { ConfigurationsContext } from "infrastructure/configurations/configurations-context/configurations-context";
import { getMineBunkerLevelIndicatorState } from "infrastructure/equipment-indicators/get-mine-bunker-level-indicator-state";
import { MineBunkerModel } from "infrastructure/equipment-indicators/mine-bunker/models/mine-bunker-model";
import { useTrendSubscription } from "infrastructure/subscription-hooks/use-trend-subscription";
import { getPositiveValueOrZero } from "infrastructure/utils/getPositiveValueOrZero";
import { useContext, useEffect, useMemo, useState } from "react";

export const useBunker = (id: typeof ElementIds[keyof typeof ElementIds]) => {
  const {configurations} = useContext(ConfigurationsContext);
  const configuration = configurations.find((x) => x.elementId === id);
  const weight = useTrendSubscription(configuration instanceof MineBunkerConfiguration ? configuration.weightTrend?.trendId : undefined);

  console.log('config', configuration);

  const [weightData, setWeightData] = useState(null);
  const [currentWeightData, setCurrentWeightData] = useState(null);

  useEffect(() => {
    const update = () => {
      if (configuration instanceof MineBunkerConfiguration) {
        requestViaBridge(`carriages/currentweight?trendIds=${configuration.weightTrend?.trendId}`).then(setCurrentWeightData);
        requestViaBridge(`carriages/weight?trendIds=${configuration.weightTrend?.trendId}`).then(setWeightData);
      }
    }

    update();

    const timer = setInterval(update, 5000);

    return () => {
      clearInterval(timer);
    }
  }, []);
  
  console.log('weight data', weight, weightData, currentWeightData);

  const state = getMineBunkerLevelIndicatorState(weight, configuration);

  const mineBunkerModel = useMemo(() => {
      return new MineBunkerModel(getPositiveValueOrZero(weight), 'T');
  }, [weight]);

  console.log('sate', state, mineBunkerModel);
}