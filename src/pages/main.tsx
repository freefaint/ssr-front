import { Stack } from "@mui/material";
import Alert, { ALERT_STATUS } from "../components/alert";
import Section from "../components/section";
import { GRAPH_NODE, RATING_NODE, INFO_NODE, STATUS_NODE } from "../mock";

const MainPage = () => {
  return (
    <Stack spacing={2}>
      <Section
        title="Рудник подземный"
        href="/rudnik"
        bodies={[
          {
            name: "vagon",
            label: "Вагонов",

            graphNode: GRAPH_NODE,
            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
            statusNode: STATUS_NODE
          },

          {
            name: "kovsh",
            label: "Ковшей",

            graphNode: GRAPH_NODE,
            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
            statusNode: STATUS_NODE
          }
        ]}
      />

      <Alert color="warning" title="ВЭСП" status={ALERT_STATUS["warning"]} text="00:00:00" />
      <Alert color="error" title="ВЭСП" status={ALERT_STATUS["error"]} text="00:00:00" />
    
      <Section
        title="ВЭСП"
        href="/vesp"
        bodies={[
          {
            name: "workday",
            label: "Смена",

            infoNode: INFO_NODE
          },

          {
            name: "hour",
            label: "Час",

            infoNode: INFO_NODE
          },

          {
            name: "day",
            label: "Сутки",

            infoNode: INFO_NODE
          }
        ]}
      />
    
      <Section
        title="Фабрика"
        href="/fabric"
        bodies={[
          {
            name: "",
            label: "",

            graphNode: GRAPH_NODE,
            statusNode: STATUS_NODE
          },
        ]}
      />
    </Stack>
  )
}

export default MainPage;
