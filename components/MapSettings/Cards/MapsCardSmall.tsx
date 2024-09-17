import { Box, Card, Flex, Text } from "@radix-ui/themes";

function MapsCardSmall({ map, isSelected, selectMap }) {
    return (
        <Card
            className={`w-full cursor-pointer ${isSelected ? `bg-primary/40` : ""} transition-all duration-300 ease-in-out flex items-center justify-center`}
            onClick={() => selectMap(map)}
        >
            <h2 className="text-xl font-bold">{map.name[0]}</h2>
        </Card>
    );
}

export default MapsCardSmall;
