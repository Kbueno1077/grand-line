import { Box, Card, IconButton, Text } from "@radix-ui/themes";
import { Goal, Star } from "lucide-react";
import EditPinsPopup from "../_components/EditPinsPopup";

function DroppedPinCard({
    location,
    getToMapPoint,
    removeFromFavorites,
    addToFavorites,
    isFavorite,
    isStatic,
}) {
    return (
        <Card className={`w-full  transition-all duration-300 ease-in-out`}>
            <Box className="w-full flex items-center justify-between">
                <Text as="div" size="2" color="gray">
                    {location.tagName ?? location.display_name}
                </Text>

                <div className={`flex  items-center gap-2.5 `}>
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

                    {!isStatic && <EditPinsPopup location={location} />}
                </div>
            </Box>
        </Card>
    );
}

export default DroppedPinCard;
