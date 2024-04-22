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
  
interface BrowserVote {
    display_name: string;
}

interface Suggestion {
    id: number;
    votes: any[];
    poi: Poi;
    browser_votes: BrowserVote[];
}
  
export interface Destination {
    name: string;
    suggestions: Suggestion[];
}
  
export interface DataProps {
    event_id: string;
    name: string;
    datetime: number;
    members: Member[];
    destinations: Destination[];
}
