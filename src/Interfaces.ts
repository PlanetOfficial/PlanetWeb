interface Icon {
  url: string;
}

interface Member {
    display_name: string;
    username: string;
    icon: Icon | null;
  }
  
interface Poi {
    name: string;
    photo: string;
    latitude: number;
    longitude: number;
    vicinity: string;
    rating: number;
    rating_count: number;
    price: number;
    start_datetime: null;
}
  
interface Suggestion {
    votes: any[];
    poi: Poi;
}
  
interface Destination {
    name: string;
    suggestions: Suggestion[];
}
  
export interface DataProps {
    name: string;
    datetime: number;
    members: Member[];
    destinations: Destination[];
}
