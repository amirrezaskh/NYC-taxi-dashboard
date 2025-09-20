import TripCharacteristic from "../characteristic/TripCharacteristic";
import Demand from "../demand/Demand";
import RevenueTips from "../revenue/RevenueTips";

export default function HomePage() {
  return (
    <>
      <RevenueTips />
      <Demand />
      <TripCharacteristic />
    </>
  )
}