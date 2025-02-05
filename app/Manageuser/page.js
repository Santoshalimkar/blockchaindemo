"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Tooltip,
  Pagination,
  Divider,
  Card,
  CardBody,
  CircularProgress,
  CardFooter,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { BsDoorClosedFill } from "react-icons/bs";
import { BaseUrl } from "../../lib/API/Baseurl";
import Cookies from "js-cookie";
import { FaExchangeAlt } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllUsers } from "@/lib/Redux/usersSlice";
import { GetAlluser } from "@/lib/API/Manageuser";
import {TicketPlus} from "lucide-react"
import Createuser from "@/components/Usercomponents/Createuser";
const columns = [
  { name: "ID", uid: "_id" },
  { name: "Name", uid: "Name" },
  { name: "Email", uid: "Email" },
  { name: "Referral Code", uid: "referralCode" },
  { name: "Status", uid: "active" },
  { name: "Rank", uid: "Rank", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const statusOptions = [
  { name: "Paid Due", uid: "Paid" },
  { name: "Pending Due", uid: "Due" },
];

export { columns, statusOptions };
const statusColorMap = {
  Paid: "success",
  Due: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "Name",
  "Email",
  "referralCode",
  "active",
  "Rank",
  "actions",
];

export default function Tennat() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
 

 

  const [openChangeroom, Setchangeroom] = useState(false);
  const [openmodal, Setopenmodal] = useState(false);
  const [openview, Setopenview] = useState(false);
  const [opendelete, Setopendelete] = useState(false);
  const [openedit, Setopenedit] = useState(false);
  const [opendoc, setopendoc] = useState(false);
  const [loadingroomdata, setLoadingData] = useState(true);
  const [userdata, setData] = useState();
  const [loadingtennat, Setloadingtennat] = useState(false);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "Status",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);


  useEffect(() => {
    dispatch(fetchAllUsers());  
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://wallet-seven-fawn.vercel.app/api/v1/users/alluser",
  //         {
  //           method: "GET",
  //           headers: {
  //             token:
  //               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTBlZmQ2ODk3MWVhNGZjM2M4MmNiOCIsImlhdCI6MTczODY4OTYzMiwiZXhwIjoxNzM4Nzc2MDMyfQ.Oo1te_YFzH5SMyoGKyewQz-lBxknfMEzkWsquygAl7I",
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const result = await response.json();
  //       if (result.status === true) {
  //         setData(result.data); // Set data if successful
  //       } else {
  //         throw new Error("Error fetching data");
  //       }
  //     } catch (error) {
  //       console.log(error.message); // Set error if fetching fails
  //     } 
  //   };
  //   fetchData()
  // }, [])
  


  const pages = Math.ceil(users?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = Array.isArray(users) ? [...users] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          typeof user.Name === "string" &&
        users.Name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((users) =>
        Array.from(statusFilter).includes(userdata.rank)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleViewClick = (id) => {
    dispatch(setSelectedTenantId(id));
    Setopenview(true);
  };

  const handleEditClick = (id) => {
    dispatch(setSelectedTenantId(id));
    Setopenedit(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(setSelectedTenantId(id));
    Setopendelete(true);
  };

  const handleChangeroomClick = (id) => {
    dispatch(setSelectedTenantId(id));
    Setchangeroom(true);
  };

  const handleDocviewClick = (id) => {
    dispatch(setSelectedTenantId(id));
    setopendoc(true);
  };

 
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "Name":
        return (
          <p className="flex items-center gap-1">
            <FaUser className="text-[#205093]" />
            {user.Name}
          </p>
        );
      case "active":
        return (
          <p className="flex items-center gap-1">
            {user.active?"active":"not active"}
          </p>
        );

      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-4">
            <Tooltip content="Details">
              <span
                // onClick={() => handleViewClick(tenant._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <IoEyeSharp className="text-[#205093]" />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span
                // onClick={() => handleEditClick(tenant._id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <RiPencilFill className="text-[#205093]" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Remove user">
              <span
                // onClick={() => handleDeleteClick(tenant._id)}
                className="text-lg text-red-500 cursor-pointer active:opacity-50"
              >
                <MdDelete />
              </span>
            </Tooltip>
            <Tooltip color="success" content="Add fund">
              <span
                // onClick={() => handleDeleteClick(tenant._id)}
                className="text-lg text-green-500 cursor-pointer active:opacity-50"
              >
            <TicketPlus />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col  gap-4 mt-4 px-2">
        <div>
          <p className="text-lg font-semibold">Manage User </p>
        </div>
        <div className="flex gap-3 justify-end items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={""}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={""}
                  size="sm"
                  className="ring-1 ring-gray-300"
                  variant="light"
                >
                  {/* <Image src={fillter} className="h-6 w-6" /> */}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={""}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Button
              onPress={() => Setopenmodal(true)}
              className="bg-[#205093] text-background"
              endContent={<FaPlus />}
              size="sm"
            ></Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users?.length} Tenants
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    userdata?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            className="bg-[#205093] text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            className="bg-[#205093] text-white"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, userdata?.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["h-screen", "max-w-3xl", "border-1"],
      th: ["bg-[#205093]", "text-white", "border-b", "border-divider"],
      td: [
        "p-3",
        "border-b",
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  

  return (
    <>
      {loading  ? (
        <div className="w-full h-full col-span-3 flex justify-center items-center">
          <span className="loader3 "></span>
        </div>
      ) : (
        <Table
          isCompact
          className="px-4"
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={classNames}
          selectedKeys={selectedKeys}
          // selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No Tenants found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item?._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={openmodal}
        onOpenChange={Setopenmodal}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Create New User
              </ModalHeader>
              <ModalBody>
                <Createuser Setopenmodal={Setopenmodal} />
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    

    
     

      {/* delete */}

      {/* <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="xl"
        isOpen={opendelete}
        onOpenChange={Setopendelete}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Confirm Remove
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full justify-start items-start">
                  <p>Do you want to Remove Tenant?</p>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end items-end ">
                <Button onPress={onClose} color="primary" variant="solid">
                  Cancel
                </Button>
                <Button
                  onPress={() => Deletetenant(selectedTenantId)}
                  color="danger"
                  variant="solid"
                >
                  {loadingtennat ? <span className="loader2"></span> : "Remove"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}

     

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
      
      />
    </>
  );
}
