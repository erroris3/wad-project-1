import { useState } from "react";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Highlight() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState();
  const [highlightCar, setHighlightCar] = useState([]);
  useEffect(() => {
    setHighlightCar(JSON.parse(localStorage.getItem("cars")));
    fetch("/taladrod-cars.min.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const carsData = jsonData.Cars;
        // console.log(carsData);
        setCars(carsData);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <div className=" p-6 flex flex-col items-center">
      <div className="flex justify-between w-full">
        <p className="text-2xl font-semibold">Highlight</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Highlight Car</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Highlight</DialogTitle>
              <DialogDescription>
                Add highlight car to the highlight page
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <div className="flex items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Cars
                </Label>
                <Select
                  onValueChange={(e) => {
                    setSelectedCar(cars.find((item) => item.Cid === e));
                  }}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Choose a car" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((item, index) => {
                      return (
                        <SelectItem key={index} value={item.Cid}>
                          {item.NameMMT}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setHighlightCar([...highlightCar, selectedCar]);
                  localStorage.setItem(
                    "cars",
                    JSON.stringify([...highlightCar, selectedCar]),
                  );
                }}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {highlightCar.length > 0 ? (
        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {highlightCar.map((item, index) => {
            return (
              <Card key={index} className="w-80 rounded-2xl">
                <div className="w-80 h-52 overflow-hidden">
                  <img
                    src={item.Img600}
                    className="object-contain rounded-t-2xl "
                    alt={item.Name}
                  />
                </div>
                <div className="p-2">
                  <p>{item.NameMMT}</p>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="mt-20">No Highlight Car</p>
      )}
    </div>
  );
}
