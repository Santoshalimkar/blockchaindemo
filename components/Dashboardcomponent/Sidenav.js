"use client";
import React, { useEffect, useState } from "react";
import {
  Hotel,
  UsersRound,
  LogOut,
  Theater,
  LayoutDashboard,
  Mail,
  PanelLeftOpen,
  PanelLeftClose,
  Clapperboard,
  HandCoins,
  IndianRupee,
  ReceiptIndianRupee 
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Tabs, Tab, Button } from "@heroui/react";
import Image from "next/image";
import { Tooltip } from "@heroui/react";
import { MdTableRestaurant } from "react-icons/md";
import { MdOutlineQrCode } from "react-icons/md";
import { ScrollArea } from "../ui/scroll-area";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import Link from "next/link";

const Sidenav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState("Dashboard");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isdelete, Setisdelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (pathname) {
      case "/":
        setSelected("Dashboard");
        break;
      case "/Manageuser":
        setSelected("Manage User");
        break;
      case "/Downlinetree":
        setSelected("Downline Tree");
        break;
     
      default:
        setSelected("Dashboard");
    }
  }, [pathname]);

  const handleTabChange = (key) => {
    setSelected(key);
    switch (key) {
      case "Dashboard":
        router.push("/");
        break;
      case "Manage User":
        router.push("/Manageuser");
        break;
      case "Downline Tree":
        router.push("/Downlinetree");
        break;
      default:
        router.push("/");
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("token");
    Cookies.remove("User");
    router.push("/");
  };

  return (
    <>
      <aside
        className={` top-0 left-0 border-r border-gray-300  h-screen hidden md:flex lg:flex flex-col items-center bg-white transition-all duration-700 ease-in-out ${
          isMinimized ? "w-20" : "w-60"
        }`}
      >
        <div className="relative w-full flex items-center justify-center h-24">
         
          <Button
            className="absolute top-2 right-0 bg-transparent text-[#004AAD]"
            onPress={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </Button>
        </div>

        <nav className="flex flex-col items-start gap-4  px-2 sm:py-5">
          {/* {!isMinimized && (
            <span className="text-[#F30278] font-medium text-sm transition-all duration-700 ease-in-out">
              Management
            </span>
          )} */}
          <Tabs
            aria-label="Options"
            isVertical={true}
            classNames={
              isMinimized
                ? {
                    tabList:
                      "relative rounded-none p-0 bg-transparent text-white w-12 transition-all duration-700 ease-in-out",
                    cursor: "w-full bg-[#004AAD] ",
                    tab: "w-full px-0 lg:h-9 md:h-8 sm:h-6 h-4",
                    tabContent:
                      "group-data-[selected=true]:text-white font-bold text-[#353536]",
                  }
                : {
                    tabList:
                      "relative rounded-none p-0 bg-transparent text-white w-52 transition-all duration-700 ease-in-out",
                    cursor: "w-full bg-[#004AAD] ",
                    tab: "w-full px-0 lg:h-9 md:h-8 sm:h-6 h-4",
                    tabContent:
                      "group-data-[selected=true]:text-white font-bold text-[#353536]",
                  }
            }
            selectedKey={selected}
            onSelectionChange={handleTabChange}
          >
            <Tab
              key="Dashboard"
              title={
                <div
                  className={`flex items-center gap-4 ${
                    isMinimized ? "justify-center" : "w-44"
                  }`}
                >
                  {!isMinimized ? (
                    <LayoutDashboard size={20} />
                  ) : (
                    <Tooltip
                      classNames={{
                        base: ["before:bg-[#004AAD]"],
                        content: [
                          "py-2 px-4 rounded-md",
                          "text-white bg-[#004AAD]",
                        ],
                      }}
                      showArrow={true}
                      content="Dashboard"
                      placement="right"
                    >
                      <LayoutDashboard size={20} />
                    </Tooltip>
                  )}
                  {!isMinimized && (
                    <span className="transition-all duration-700 ease-in-out">
                      Dashboard
                    </span>
                  )}
                </div>
              }
            />
            <Tab
              key="Manage User"
              title={
                <div
                  className={`flex items-center gap-4 ${
                    isMinimized ? "justify-center" : "w-44"
                  }`}
                >
                  {!isMinimized ? (
                    <UsersRound size={20} />
                  ) : (
                    <Tooltip
                      classNames={{
                        base: ["before:bg-[#004AAD]"],
                        content: [
                          "py-2 px-4 rounded-md",
                          "text-white bg-[#004AAD]",
                        ],
                      }}
                      showArrow={true}
                      content="Manage User"
                      placement="right"
                    >
                      <Hotel size={20} />
                    </Tooltip>
                  )}
                  {!isMinimized && (
                    <span className="transition-all duration-700 ease-in-out">
                      Manage User
                    </span>
                  )}
                </div>
              }
            />
            <Tab
              key="Downline Tree"
              title={
                <div
                  className={`flex items-center gap-4 ${
                    isMinimized ? "justify-center" : "w-44"
                  }`}
                >
                  {!isMinimized ? (
                    <UsersRound size={20} />
                  ) : (
                    <Tooltip
                      classNames={{
                        base: ["before:bg-[#004AAD]"],
                        content: [
                          "py-2 px-4 rounded-md",
                          "text-white bg-[#004AAD]",
                        ],
                      }}
                      showArrow={true}
                      content="Downline Tree"
                      placement="right"
                    >
                      <UsersRound size={20} />
                    </Tooltip>
                  )}
                  {!isMinimized && <span>Downline Tree</span>}
                </div>
              }
            />
           
            
           
            
          </Tabs>
          {/* {!isMinimized && <span className="text-[#F30278] font-medium text-sm transition-all duration-700 ease-in-out">Account</span>} */}
          {/* <Button variant="light"  className="w-full bg-white flex justify-start items-center gap-4"><Settings/>Settings</Button>
         <Button variant="light"  className="w-full bg-white flex justify-start items-center gap-4"><User/>Profile</Button> */}
        </nav>

        <nav
          className={
            !isMinimized
              ? "mt-auto flex w-52 justify-start items-start gap-4 px-2 sm:py-5 transition-all duration-700 ease-in-out"
              : "mt-auto flex w-20 justify-start items-start gap-4 px-2 sm:py-5 transition-all duration-700 ease-in-out"
          }
        >
          <Button
            onPress={() => Setisdelete(true)}
            className="flex items-center w-full justify-start bg-transparent gap-4 text-white font-semibold "
          >
            {!isMinimized ? (
              <LogOut size={20} className="text-[#004AAD]" />
            ) : (
              <Tooltip
                classNames={{
                  base: ["before:bg-[#004AAD]"],
                  content: ["py-2 px-4 rounded-md", "text-white bg-[#004AAD]"],
                }}
                showArrow={true}
                content="Logout"
                placement="right"
              >
                <LogOut size={20} className="text-[#004AAD]" />
              </Tooltip>
            )}
            {!isMinimized && (
              <span className="text-sm text-[#004AAD]">Logout</span>
            )}
          </Button>
        </nav>
      </aside>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isdelete}
        onOpenChange={Setisdelete}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Confirm Logout
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  onPress={() => {
                    handleLogout();
                    onClose();
                  }}
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#F30278] text-white"
                >
                  Yes
                </Button>
                <Button
                  size="md"
                  onPress={() => Setisdelete(false)}
                  className="px-8 py-0.5 rounded-sm w-48 bg-[#004AAD] text-white"
                >
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sidenav;
