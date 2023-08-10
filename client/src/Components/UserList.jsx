import React, { useEffect, useState } from "react";
import { fetchUsers } from "../Redux/Users/usersActions";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../Redux/Users/usersActions";
import { traerFacturas } from "../Redux/Comprado/compActions";
import { BiCheckboxSquare, BiCheckbox } from "react-icons/bi";

function UserList() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.users.usersList);
  const facturas = useSelector((state) => state.comprado.comprados);
  console.log("USER", usuarios);
  const [encontrarUser, setEncontrarUser] = useState([]);
  const [searchedUserName, setSearchedUserName] = useState();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(traerFacturas());

    setEncontrarUser(usuarios);
  }, [dispatch]);

  console.log("ESTADO LOCAL:", encontrarUser);

  function formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date)
      .toLocaleDateString(undefined, options)
      .replace(/\//g, "-");
  }

  // modifica el bloqueo del usuario
  function encontrar(user) {
    const { uid } = user;
    console.log("el UID CHOTO", uid);
    console.log("EL USER A CAMBIAR", user);

    if (user.locked) {
      dispatch(
        editUser(uid, {
          id: user.id,
          uid: user.uid,
          profile: user.profile,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          dateRecord: user.dateRecord,
          locked: false,
        })
      );
    } else {
      dispatch(
        editUser(uid, {
          id: user.id,
          uid: user.uid,
          profile: user.profile,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          dateRecord: user.dateRecord,
          locked: true,
        })
      );
    }
  }

  function rol(user) {
    const { uid } = user;

    if (user.profile === 1) {
      dispatch(
        editUser(uid, {
          id: user.id,
          uid: user.uid,
          profile: 2,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          dateRecord: user.dateRecord,
          locked: user.locked,
        })
      );
    } else {
      dispatch(
        editUser(uid, {
          id: user.id,
          uid: user.uid,
          profile: 1,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          dateRecord: user.dateRecord,
          locked: user.locked,
        })
      );
    }
  }

  //buscar usuario por id
  function buscarUser() {
    const foundUsers = usuarios.filter(
      (us) =>
        us.name.toLowerCase().includes(searchedUserName.toLowerCase()) ||
        us.lastName.toLowerCase().includes(searchedUserName.toLowerCase())
    );

    setEncontrarUser(foundUsers);
  }

  let pushComprados = [];
  facturas.forEach((ele) => {
    if (ele.ItemsBills) {
      ele.ItemsBills.forEach((item) => {
        pushComprados.push(item);
      });
    }
  });

  console.log("pushComprados:", pushComprados);

  const userCompras = {};
  facturas.forEach((fac) => {
    userCompras[fac.idUser] = true;
  });

  return (
    <div className="m-10">
      <div className="bg-gray-200">
        <input
          className="rounded-xl h-[50px] border-gray-300"
          type="text"
          onChange={(e) => setSearchedUserName(e.target.value)}
        />
        <button
          className="rounded-lg h-[50px]  bg-green-400 m-3 border-2 pl-2 pr-2 border-green-400 text-gray-100 text-lg fonte font-bold"
          onClick={() => buscarUser()}
        >
          Buscar Usuario
        </button>
      </div>

      <div className="border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                n°
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Create Date
              </th>

              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enabled/Disabled{" "}
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cambiar Rol
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compró
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {encontrarUser
              ? encontrarUser.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-3 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{user.name}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {user.lastName}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {formatDate(user.dateRecord)}
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.locked}
                          onChange={() => encontrar(user)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-red-400 after:border-red-500 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-600 peer-checked:bg-red-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <select
                        className="bg-blue-500 text-gray-100 border-2 border-blue-700 font-bold p-1 rounded-xl"
                        value={user.profile}
                        onChange={() => {
                          rol(user);
                        }}
                      >
                        <option value="1">Usuario</option>
                        <option value="2">Administrador</option>
                      </select>
                    </td>
                    <td>
                      <td>
                        {userCompras[user.id] ? (
                          <BiCheckboxSquare className="w-[45px] text-green-400 h-[45px]" />
                        ) : (
                          <BiCheckbox className="w-[45px] text-gray-400 h-[45px]" />
                        )}
                      </td>
                    </td>
                  </tr>
                ))
              : usuarios.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-3 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{user.name}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {user.lastName}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {formatDate(user.dateRecord)}
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.locked}
                          onChange={() => encontrar(user)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-red-400 after:border-red-500 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-600 peer-checked:bg-red-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <select
                        className="bg-blue-500 text-gray-100 border-2 border-blue-700 font-bold p-1 rounded-xl"
                        value={user.profile}
                        onChange={() => {
                          rol(user);
                        }}
                      >
                        <option value="1">Usuario</option>
                        <option value="2">Administrador</option>
                      </select>
                    </td>
                    <td>
                      {userCompras[user.id] ? (
                        <BiCheckboxSquare className="w-[45px] text-green-400 h-[45px]" />
                      ) : (
                        <BiCheckbox className="w-[45px] text-gray-400 h-[45px]" />
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
