import React, { useEffect } from "react";
import { fetchUsers } from "../Redux/Users/usersActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Title,
  Text,
  Col,
  Card,
  Grid,
  Flex,
  Metric,
  BadgeDelta,
  ProgressBar,
  DonutChart,
} from "@tremor/react";
import { traerFacturas } from "../Redux/Comprado/compActions";

function UserCardGrid() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.users.usersList);
  const facturas = useSelector((state) => state.comprado.comprados);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(traerFacturas());
  }, []);
  console.log("FACTURAS", facturas);

  const idsUsuariosCompraron = [];

  facturas.forEach((factura) => {
    const idUsuario = factura.uidUser;
    if (!idsUsuariosCompraron.includes(idUsuario)) {
      idsUsuariosCompraron.push(idUsuario);
    }
  });

  const montosComprados = [];

  facturas.forEach((factura) => {
    const valorFactura = Number(factura.fullValue);
    montosComprados.push(valorFactura);
  });
  console.log(montosComprados); //joya esto son numeros

  let sumaDeMontos = 0;
  montosComprados.forEach((monto) => (sumaDeMontos = sumaDeMontos + monto));
  console.log("suma", sumaDeMontos);

  const cantidadUsuariosCompraron = idsUsuariosCompraron.length;
  const montoPromedioPorUsuario = sumaDeMontos / cantidadUsuariosCompraron;
  const cantidad = usuarios.length;

  const porcentaje = (cantidad / cantidadUsuariosCompraron) * 100;
  console.log(porcentaje);

  const usuariosConCompras = new Set();

  facturas.forEach((factura) => {
    usuariosConCompras.add(factura.uidUser);
  });

  const cantidadUsuariosConCompras = usuariosConCompras.size;
  const cantidadUsuariosSinCompras = cantidad - cantidadUsuariosConCompras;
  console.log("CON COMPRA", cantidadUsuariosConCompras);
  console.log("SIN COMPRA", cantidadUsuariosSinCompras);

  // Preparar los datos para el gráfico de donut
  const dataDonutChart = [
    {
      title: "Usuarios con Compras",
      metric: cantidadUsuariosConCompras,
    },
    {
      title: "Usuarios sin Compras",
      metric: cantidadUsuariosSinCompras,
    },
  ];

  return (
    <>
      <Grid numCols={3} numColsMd={2} numColsLg={3} className="mt-10 ">
        <Col numColSpan={1} numColSpanMd={1} numColSpanLg={1} className="m-4">
          <Card>
            <Flex>
              <div className="flex flex-col ">
                <Text className="mr-5 text-lg mb-3">
                  Promedio de venta por usuario
                </Text>

                {isNaN(montoPromedioPorUsuario) ? (
                  <Metric>-</Metric>
                ) : (
                  <Metric>${montoPromedioPorUsuario}</Metric>
                )}
              </div>
              <BadgeDelta
                className="bg-red-400"
                deltaType="increase"
                isIncreasePositive={true}
                size="xs"
              >
                {""}
              </BadgeDelta>
            </Flex>
          </Card>
        </Col>
        <Col numColSpan={1} numColSpanMd={1} numColSpanLg={1} className="m-4">
          <Card>
            <Flex>
              <div className="flex flex-col">
                <Text className="mr-5 text-lg pb-5 mb-5">
                  Usuarios Registrados
                </Text>

                <Metric>{cantidad}</Metric>
              </div>
              <BadgeDelta
                className="bg-red-400"
                deltaType="increase"
                isIncreasePositive={true}
                size="xs"
              >
                {""}
              </BadgeDelta>
            </Flex>
          </Card>
        </Col>
        <Col numColSpan={1} numColSpanMd={1} numColSpanLg={1} className="m-4">
          <Card>
            <Flex>
              <div className="flex flex-col">
                <Text className="mr-5 text-lg mb-5">Usuarios Con Compras</Text>

                <Metric>{cantidadUsuariosCompraron}</Metric>
                <ProgressBar
                  className="mt-3"
                  color="teal"
                  percentageValue={porcentaje}
                />
              </div>
              <BadgeDelta
                className="bg-red-400"
                deltaType="increase"
                isIncreasePositive={true}
                size="xs"
              >
                {""}
              </BadgeDelta>
            </Flex>
          </Card>
        </Col>
      </Grid>
      <div className=" flex justify-center">
        <Card className="max-w-lg items-center justify-center text-center">
          <Title>Distribución de Usuarios</Title>
          <DonutChart
            className="mt-6 ml-[32%] w-[200px] h-[200px] text-2xl items-center justify-center text-center"
            data={dataDonutChart}
            category="metric"
            index="title"
            colors={["violet", "amber"]}
          />
        </Card>
      </div>
    </>
  );
}

export default UserCardGrid;
