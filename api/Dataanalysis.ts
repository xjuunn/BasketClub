
export interface Result {
    code: number;
    data: Data;
    message: string;
    [property: string]: any;
}

export interface Data {
    eventAnalysis: EventAnalysis;
    productAnalysis: ProductAnalysis;
    venueAnalysis: VenueAnalysis;
    [property: string]: any;
}

export interface EventAnalysis {
    topEvents: TopEvent[];
    [property: string]: any;
}

export interface TopEvent {
    eventID: number;
    eventName: string;
    imageUrl: string;
    registrationCount: number;
    status: string;
    totalRevenue: number;
    [property: string]: any;
}

export interface ProductAnalysis {
    topProducts: TopProduct[];
    [property: string]: any;
}

export interface TopProduct {
    category?: string;
    imageUrl?: string;
    productID?: number;
    productName?: string;
    salesCount?: number;
    totalRevenue?: number;
    [property: string]: any;
}

export interface VenueAnalysis {
    topVenues: TopVenue[];
    [property: string]: any;
}

export interface TopVenue {
    bookingCount: number;
    imageUrl: string;
    location: string;
    occupancyRate: number;
    totalRevenue: number ;
    venueID: number;
    venueName: string;
    [property: string]: any;
}

export function getdata() {
    return useAxios().get<Result>('/data-analysis/resource-rankings');
}