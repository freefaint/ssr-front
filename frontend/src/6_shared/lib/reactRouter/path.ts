export const getRoutePathWorkshopsList = () => '/' as const;
export const getRoutePathWorkshopDetailsById = (id: string | number = ':id') =>
	`/workshop-details/${id}` as const;
export const getRoutePathNotAllowed = () => '/not-allowed' as const;
