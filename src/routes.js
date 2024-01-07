import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Album from "./pages/Album";
import { Appointment } from "./pages/Appointment";
import { AppointmentDetails } from "./pages/AppointmentDetails";
import { Appointments } from "./pages/Appointments";
import Authentication from "./pages/Authentication";
import Calendar from "./pages/Calendar";
import Chat from "./pages/Chat";
import CodeVerification from "./pages/CodeVerification";
import { ConfirmSchedule } from "./pages/ConfirmSchedule";
import { CreateSchedule } from "./pages/CreateSchedule";
import Dashboard from "./pages/Dashboard";
import FindBackground from "./pages/FindBackground";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Podcast from "./pages/Podcast";
import { Profile } from "./pages/Profile";
import Radio from "./pages/Radio";
import RadioIntro from "./pages/RadioIntro";
import Recording from "./pages/Recording";
import Reference from "./pages/Reference";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Shedule from "./pages/Shedule";
import SoundBuilded from "./pages/SoundBuilded";
import Streaming from "./pages/Streaming";
import WaitBackground from "./pages/WaitBackground";
import Welcomeback from "./pages/Welcomeback";

const Stack = createStackNavigator();

const Aproved = props => <Shedule label="Aprovadas" type="aproved" {...props} />;
const Pending = props => <Shedule label="Pendentes" type="pending" {...props} />;

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcomeback"
    >
      <Stack.Screen name="Welcomeback" component={Welcomeback} />
      <Stack.Screen
        name="Authentication"
        component={Authentication}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        name="CodeVerification"
        component={CodeVerification}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RadioIntro" component={RadioIntro} />
      <Stack.Screen name="Radio" component={Radio} />
      <Stack.Screen name="Podcast" component={Podcast} />
      <Stack.Screen name="Streaming" component={Streaming} />
      <Stack.Screen name="Album" component={Album} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Pending" component={Pending} />
      <Stack.Screen name="Aproved" component={Aproved} />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="FindBackground" component={FindBackground} />
      <Stack.Screen
        name="WaitBackground"
        component={WaitBackground}
      />
      <Stack.Screen
        name="SoundBuilded"
        component={SoundBuilded}
      />
      <Stack.Screen name="Recording" component={Recording} />
      <Stack.Screen name="Reference" component={Reference} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateSchedule" component={CreateSchedule} />
      <Stack.Screen name="ConfirmSchedule" component={ConfirmSchedule} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
    </Stack.Navigator>
  );
}
