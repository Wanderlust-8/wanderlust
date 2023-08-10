import React from "react";
import {
  Title,
  Text,
  Card,
  Metric,
  TabList,
  Tab,
  BarChart,
  DateRangePicker,
  DonutChart,
} from "@tremor/react";
import NavBar from "./NavBar";
import SideBarAdmin from "./SideBarAdmin";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { es } from "date-fns/locale";
import {
  fetchBills,
  filterSalesByProducts,
} from "../Redux/Dashboard/dashboardAction";

function DashboardAdmin() {
  const dispatch = useDispatch();

  const salesRaw = useSelector((state) => state.bills);
  const { bills, billsProducts } = salesRaw;

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(filterSalesByProducts());
  }, [dispatch]);

  const [selectedView, setSelectedView] = useState("1");

  const [value, setValue] = useState([new Date(2023, 1, 1), new Date()]);

  //suma ventas totales

  const calculateTotalSales = (bills) => {
    let total = 0;
    bills.forEach((e) => {
      total += e.amount;
    });
    return total;
  };
  const totalSales = calculateTotalSales(bills);

  //suma de ventas por mes
  const calculateSalesByMonth = (bills) => {
    const totalByDate = bills.reduce((result, bill) => {
      const { date, amount } = bill;
      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += amount;
      return result;
    }, {});

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const salesArray = Object.keys(totalByDate).map((date) => {
      const monthNumber = parseInt(date, 10);
      const monthName = monthNames[monthNumber - 1] || "";
      return {
        date: monthName,
        amount: totalByDate[date],
      };
    });
    return salesArray;
  };
  const salesByMonth = calculateSalesByMonth(bills);

  // Suma de ventas totales de paquetes

  const calculateTotaPackageSales = (billsProducts) => {
    let total = 0;
    billsProducts.forEach((e) => {
      if (e.typeProduct === 1) total += e.amount;
    });
    return total;
  };
  const totalPackageSales = calculateTotaPackageSales(billsProducts);

  //suma de ventas por paquetes

  const calculateSalesPackages = (billsProducts) => {
    const totalByPackage = {};
    billsProducts.forEach((bill) => {
      if (bill.typeProduct === 1) {
        const { title, amount } = bill;
        if (!totalByPackage[title]) {
          totalByPackage[title] = 0;
        }
        totalByPackage[title] += amount;
      }
    });
    const result = Object.keys(totalByPackage).map((title) => ({
      title,
      amount: totalByPackage[title],
    }));
    return result;
  };

  // const monthNames = [
  //   "Enero",
  //   "Febrero",
  //   "Marzo",
  //   "Abril",
  //   "Mayo",
  //   "Junio",
  //   "Julio",
  //   "Agosto",
  //   "Septiembre",
  //   "Octubre",
  //   "Noviembre",
  //   "Diciembre",
  // ];

  // const salesArray = Object.keys(totalByDate).map((date) => {
  //   const monthNumber = parseInt(date, 10);
  //   const monthName = monthNames[monthNumber - 1] || "";
  //   return {
  //     date: monthName,
  //     amount: totalByDate[date],
  //   };
  // });
  // return salesArray;

  const salesPackages = calculateSalesPackages(billsProducts);

  // suma total de actividades
  const calculateActivitiesSales = (billsProducts) => {
    let total = 0;
    billsProducts.forEach((e) => {
      if (e.typeProduct === 2) total += e.amount;
    });
    return total;
  };
  const totalActivitiesSales = calculateActivitiesSales(billsProducts);

  //suma de ventas por actividades

  const calculateSalesActivities = (billsProducts) => {
    const totalByActivity = {};
    billsProducts.forEach((bill) => {
      if (bill.typeProduct === 2) {
        const { title, amount } = bill;
        if (!totalByActivity[title]) {
          totalByActivity[title] = 0;
        }
        totalByActivity[title] += amount;
      }
    });
    const result = Object.keys(totalByActivity).map((title) => ({
      title,
      amount: totalByActivity[title],
    }));
    return result;
  };

  const salesActivities = calculateSalesActivities(billsProducts);

  //lleva las cantidades del gráfico a USD
  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  const handleDateRange = (newValue) => {
    setValue(newValue);
  };

  return (
    <main className=" w-full">
      <Title>Dashboard</Title>
      <Text>Dashboard de ventas</Text>
      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
      >
        <Tab value="1" text="Ventas totales" />
        <Tab value="2" text="Ventas por Paquete" />
        <Tab value="3" text="Ventas por Actividad" />
      </TabList>

      <div className="flex items-center justify-center mt-[100px]">
        {selectedView === "1" && (
          <Card className="w-[80%] ">
            <Text>Ventas totales</Text>
            <Metric>${totalSales.toLocaleString()}</Metric>
            <BarChart
              className="mt-6"
              data={salesByMonth}
              index="date"
              categories={["amount"]}
              colors={["blue"]}
              yAxisWidth={48}
            />
          </Card>
        )}
      </div>

      <div className="flex items-center justify-center">
        {selectedView === "2" && (
          <Card className="w-[80%]">
            <Text>Ventas por Paquete</Text>
            {/* <DateRangePicker
              className="max-w-md mx-auto"
              value={value}
              onValueChange={setValue}
              locale={es}
              dropdownPlaceholder="Seleccionar"
            /> */}
            <Metric>${totalPackageSales.toLocaleString()}</Metric>
            <DonutChart
              className="mt-6 ml-[32%] w-[400px] h-[400px] text-2xl items-center justify-center text-center"
              data={salesPackages}
              category="amount"
              index="title"
              colors={[
                "slate",
                "violet",
                "indigo",
                "rose",
                "cyan",
                "amber",
                "emerald",
                "orange",
                "pink",
                "fuchsia",
                "red",
                "yellow",
                "lime",
                "teal",
                "purple",
                "violet",
                "blue",
                "neutral",
              ]}
              valueFormatter={valueFormatter}
            />
          </Card>
        )}
      </div>

      <div className="flex items-center justify-center">
        {selectedView === "3" && (
          <Card className="w-[80%]">
            <Text>Ventas por Actividad</Text>
            {/* <DateRangePicker
            className="max-w-md mx-auto"
            value={value}
            onValueChange={setValue}
            locale={es}
            dropdownPlaceholder="Seleccionar"
          /> */}
            <Metric>${totalActivitiesSales.toLocaleString()}</Metric>
            {/* <BarChart
            className="mt-6"
            data={salesActivities}
            index="title"
            categories={["amount"]}
            colors={["blue"]}
            yAxisWidth={48}
          /> */}

            <DonutChart
              className="mt-6 ml-[32%] w-[400px] h-[400px] text-2xl items-center justify-center text-center"
              data={salesActivities}
              category="amount"
              index="title"
              colors={[
                "slate",
                "violet",
                "indigo",
                "rose",
                "cyan",
                "amber",
                "emerald",
                "orange",
                "pink",
                "fuchsia",
                "red",
                "yellow",
                "lime",
                "teal",
                "purple",
                "violet",
                "blue",
              ]}
              valueFormatter={valueFormatter}
            />
          </Card>
        )}
      </div>
    </main>
  );
}

export default DashboardAdmin;
