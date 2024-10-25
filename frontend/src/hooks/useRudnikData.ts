
import { ElementIds } from "business/monitoring/configurations/elements/element-ids";
import { FunnelConfiguration } from "business/monitoring/configurations/funnel-configuration";
import { ParameterIndicatorConfiguration } from "business/monitoring/configurations/parameter-indicator-configuration";
import { requestViaBridge } from "components/smartapp";
import { ConfigurationsContext } from "infrastructure/configurations/configurations-context/configurations-context";
import { getFunnelState } from "infrastructure/equipment-indicators/funnel/funnel-data";
import { DateTime } from "luxon";
import { useContext, useEffect, useMemo, useState } from "react";

export const useTrendSubscription = (name?: string) => {
  const {configurations} = useContext(ConfigurationsContext);
  const configuration = useMemo(() => configurations.find((x) => x.elementId === name), [configurations, name]);

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

  return currentData;
}

export const useRudnikData = (id: typeof ElementIds[keyof typeof ElementIds]) => {
    const {configurations} = useContext(ConfigurationsContext);
    const configuration = configurations.find((x) => x.elementId === id);

    const shiftBuckets = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.shiftBucketsTrend?.trendId : undefined,
    );
    const wagons = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.wagonsTrend?.trendId : undefined,
    );
    const avgWeight = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.avgWeightTrend?.trendId : undefined,
    );
    const weight = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.weightTrend?.trendId : undefined,
    );
    const firstHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.firstHoursTrend?.trendId : undefined,
    );
    const secondHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.secondHoursTrend?.trendId : undefined,
    );
    const thirdHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.thirdHoursTrend?.trendId : undefined,
    );
    const fourthHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.fourthHoursTrend?.trendId : undefined,
    );
    const fifthHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.fifthHoursTrend?.trendId : undefined,
    );
    const sixthHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.sixthHoursTrend?.trendId : undefined,
    );
    const firstNightHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.firstNightHoursTrend?.trendId : undefined,
    );
    const secondNightHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.secondNightHoursTrend?.trendId : undefined,
    );
    const thirdNightHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.thirdNightHoursTrend?.trendId : undefined,
    );
    const fourthNightHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.fourthNightHoursTrend?.trendId : undefined,
    );
    const fifthNightHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.fifthNightHoursTrend?.trendId : undefined,
    );
    const sixthNightHours = useTrendSubscription(
        configuration instanceof ParameterIndicatorConfiguration ? configuration.sixthNightHoursTrend?.trendId : undefined,
    );

    const currentHour = DateTime.now().toLocal().hour;
    const isDayShift = currentHour < 20 && currentHour >= 8;

  return {
    shiftBuckets,
    wagons,
    avgWeight,
    weight,
    firstHours,
    secondHours,
    thirdHours,
    fourthHours,
    fifthHours,
    sixthHours,
    firstNightHours,
    secondNightHours,
    thirdNightHours,
    fourthNightHours,
    fifthNightHours,
    sixthNightHours,
    isDayShift
  }
}