import React, { useState } from "react";
import { Title, Text, TabList, Tab } from "@tremor/react";
import UserList from "../Components/UserList";
import UserCardGrid from "./UserCardGrid";

function UserStadist() {
  const [selectedView, setSelectedView] = useState(1);
  return (
    <>
      <main>
        <Title>USUARIOS</Title>
        <Text>Dashboard Administrador - USUARIOS</Text>
        <TabList
          defaultValue={selectedView}
          onValueChange={(value) => setSelectedView(value)}
        >
          <Tab value={1} text="Graficos" />
          <Tab value={2} text="Usuarios" />
        </TabList>
        {selectedView === 1 ? <UserCardGrid /> : <UserList />}
      </main>
    </>
  );
}

export default UserStadist;
