import { Box, Card, Flex, Text } from "@radix-ui/themes";

function MapTypeCard({ mapType, handleChange, isSelected }) {
    return (
        <Card
            className={`w-full cursor-pointer ${isSelected ? `bg-primary/40` : ""} transition-all duration-300 ease-in-out`}
            onClick={() => handleChange(mapType)}
        >
            <Flex gap="3" align="center">
                <Box>
                    <Text as="div" size="2" color="gray">
                        {mapType.name}
                    </Text>
                </Box>
            </Flex>
        </Card>
    );
}

export default MapTypeCard;
