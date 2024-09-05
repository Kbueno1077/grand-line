import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { CircleX, Goal } from "lucide-react";

function DroppedPinCard({ location, getToMapPoint, removeMapPoint }) {
    return (
        <Card className={`w-full  transition-all duration-300 ease-in-out`}>
            <Flex gap="3" align="center">
                <Box className="w-full flex items-center justify-between">
                    <Text as="div" size="2" color="gray">
                        {location.display_name}
                    </Text>

                    <div className="flex items-center gap-2.5 ">
                        <IconButton
                            onClick={() => getToMapPoint(location)}
                            className="cursor-pointer"
                            variant="ghost"
                        >
                            <Goal size={20} />
                        </IconButton>
                        <IconButton
                            onClick={() => removeMapPoint(location)}
                            className="cursor-pointer"
                            variant="ghost"
                            color="red"
                        >
                            <CircleX size={20} />
                        </IconButton>
                    </div>
                </Box>
            </Flex>
        </Card>
    );
}

export default DroppedPinCard;
