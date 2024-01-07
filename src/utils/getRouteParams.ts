import { NavigationState } from "@react-navigation/native";

export function getRouteParams<T>(routeState: NavigationState, routeName: string) {
  const { params } = routeState.routes.find(
    route => route.name === routeName
  ) ?? {};
  return params as T;
}
