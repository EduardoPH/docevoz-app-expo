import React, { useCallback, useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";

import {  LayoutWrapper, PageContainer } from "./styles";
import { CustomStatusBar } from "../CustomStatusBar";

export function Layout({ children }) {
  return (
    <LayoutWrapper>
      <CustomStatusBar />
      <PageContainer>
        {children}
      </PageContainer>
    </LayoutWrapper>
  );
}
