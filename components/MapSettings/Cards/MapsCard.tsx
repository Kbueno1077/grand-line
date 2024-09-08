import { Box, Card, Flex, Text } from "@radix-ui/themes";

function MapsCard({ map, isSelected, selectMap }) {
    return (
        <Card
            className={`w-full cursor-pointer ${isSelected ? `bg-primary/40` : ""} transition-all duration-300 ease-in-out`}
            onClick={() => selectMap(map)}
        >
            <Flex gap="3" align="center" justify={"between"}>
                <Box className="flex gap-2 items-center">
                    <Text as="div" size="3" color="gray">
                        {map.name}
                    </Text>
                </Box>
            </Flex>
        </Card>
    );
}

export default MapsCard;
