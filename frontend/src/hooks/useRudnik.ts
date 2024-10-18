import { ElementIds } from "business/monitoring/configurations/elements/element-ids";
import { MineBunkerConfiguration } from "business/monitoring/configurations/mine-bunker-configuration";
import { requestViaBridge } from "components/smartapp";
import Decimal from "decimal.js";
import { ConfigurationsContext } from "infrastructure/configurations/configurations-context/configurations-context";
import { getMineBunkerLevelIndicatorState } from "infrastructure/equipment-indicators/get-mine-bunker-level-indicator-state";
import { MineBunkerModel } from "infrastructure/equipment-indicators/mine-bunker/models/mine-bunker-model";
import { useTrendSubscription } from "infrastructure/subscription-hooks/use-trend-subscription";
import { getPositiveValueOrZero } from "infrastructure/utils/getPositiveValueOrZero";
import { useContext, useEffect, useMemo, useState } from "react";

export const useBunker = (id: typeof ElementIds[keyof typeof ElementIds]) => {
  const {configurations} = useContext(ConfigurationsContext);
  const configuration = configurations.find((x) => x.elementId === id);
  // const weight = useTrendSubscription(configuration instanceof MineBunkerConfiguration ? configuration.weightTrend?.trendId : undefined);

  console.log('config', configuration);

  const [currentWeightData, setCurrentWeightData] = useState<Decimal>();
  const [rand, setRand] = useState<Decimal>(new Decimal(Math.round(Math.random() * 5000)));

  useEffect(() => {
    const update = () => {
      setRand(new Decimal(Math.round(Math.random() * 5000)));

      if (configuration instanceof MineBunkerConfiguration) {
        requestViaBridge(`carriages/currentweight?trendIds=${configuration.weightTrend?.trendId}`).then(setCurrentWeightData);
      }
    }

    update();

    const timer = setInterval(update, 1000);

    return () => {
      clearInterval(timer);
    }
  }, []);
  
  console.log('weight data', currentWeightData);

  const state = getMineBunkerLevelIndicatorState(currentWeightData, configuration);

  const mineBunkerModel = useMemo(() => {
      return new MineBunkerModel(getPositiveValueOrZero(currentWeightData), 'T');
  }, [currentWeightData]);

  console.log('sate', state, mineBunkerModel);

  return {
    rand
  }
}