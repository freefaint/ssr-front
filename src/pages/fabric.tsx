import { Stack } from "@mui/material";
import { GraphBlock } from "../components/graph";
import Section from "../components/section";
import { RATING_NODE, INFO_NODE } from "../mock";

const FabricPage = () => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <GraphBlock />

        <GraphBlock />
      </Stack>
      
      <Section
        bodies={[
          {
            name: "vagon",
            label: "Вагонов",

            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
          },

          {
            name: "kovsh",
            label: "Ковшей",

            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
          }
        ]}
      />
    </Stack>
  )
}

export default FabricPage;