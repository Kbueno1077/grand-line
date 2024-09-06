import { Box, Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { CircleX, Goal, Star } from "lucide-react";
import NameFieldUpdate from "../_components/NameFieldUpdate";

function DroppedPinCard({
    location,
    getToMapPoint,
    removeMapPoint,
    index = -1,
    removeFromFavorites,
    addToFavorites,
    isFavorite,
    isStatic,
}) {
    return (
        <Card className={`w-full  transition-all duration-300 ease-in-out`}>
            <Box className="w-full flex items-center justify-between">
                {!isStatic ? (
                    <NameFieldUpdate
                        name={location.tagName ?? location.display_name}
                        index={index}
                    />
                ) : (
                    <Text as="div" size="2" color="gray">
                        {location.tagName ?? location.display_name}
                    </Text>
                )}

                <div
                    className={`flex  items-center gap-2.5 ${isStatic ? "flex-row" : "flex-col"}`}
                >
                    <IconButton
                        variant="ghost"
                        color="amber"
                        className="cursor-pointer fill-yellow-400"
                        onClick={(e) =>
                            isFavorite
                                ? removeFromFavorites(e, location)
                                : addToFavorites(e, location)
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

                    <IconButton
                        onClick={() => getToMapPoint(location)}
                        className="cursor-pointer"
                        variant="ghost"
                    >
                        <Goal size={20} />
                    </IconButton>
                    {!isStatic && (
                        <IconButton
                            onClick={() => removeMapPoint(location)}
                            className="cursor-pointer"
                            variant="ghost"
                            color="red"
                        >
                            <CircleX size={20} />
                        </IconButton>
                    )}
                </div>
            </Box>
        </Card>
    );
}

export default DroppedPinCard;
