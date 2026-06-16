export type DeliveryMethod = "delivery" | "pickup";

export type GeoLocation = {
  lat: number;
  lng: number;
  accuracy?: number;
};
