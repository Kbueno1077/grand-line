import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { Star } from "lucide-react";
import Image from "next/image";

function MapTypeCard({
    mapType,
    handleChange,
    isSelected,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
}) {
    return (
        <Card
            className={`w-full cursor-pointer ${isSelected ? `bg-primary/40` : ""} transition-all duration-300 ease-in-out`}
            onClick={() => handleChange(mapType)}
        >
            <Flex gap="3" align="center" justify={"between"}>
                <Box className="flex gap-2 items-center">
                    {mapType.img && (
                        <Image
                            src={mapType.img || ""}
                            alt={mapType.name}
                            width={40}
                            height={40}
                            className="rounded-sm"
                        />
                    )}
                    <Text as="div" size="3" color="gray">
                        {mapType.name}
                    </Text>
                </Box>

                <div>
                    <IconButton
                        variant="ghost"
                        color="amber"
                        className="cursor-pointer fill-yellow-400"
                        onClick={(e) =>
                            isFavorite
                                ? removeFromFavorites(e, mapType)
                                : addToFavorites(e, mapType)
                        }
                    >
                        <Star
                            size={20}
                            strokeWidth={isFavorite ? 0 : 1}
                            fill={
                                isFavorite ? "fill-yellow-400" : "transparent"
                            }
                        />
                    </IconButton>
                </div>
            </Flex>
        </Card>
    );
}

export default MapTypeCard;
