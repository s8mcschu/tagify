import { Pipe, PipeTransform } from '@angular/core';

type TimeUnit = "ms" | "s" | "m" | "h";

@Pipe({
  name: 'timeConverter'
})
export class TimeConverterPipe implements PipeTransform {

  transform(value: number, from: TimeUnit, to: TimeUnit): number {
    switch(from) {
      case "ms":
        if(to === "s") return value / 1000;
        if(to === "m") return value / 60000;
        if(to === "h") return value / 3600000;
        return value;
      case "s":
        if(to === "ms") return value * 1000;
        if(to === "m") return value / 60;
        if(to === "h") return value / 3600;
        return value;
      case "m":
        if(to === "ms") return value * 60000;
        if(to === "s") return value * 60;
        if(to === "h") return value / 60;
        return value;
      case "h":
        if(to === "ms") return value * 3600000;
        if(to === "s") return value * 3600;
        if(to === "m") return value * 60;
        return value;
    }
  }

}
