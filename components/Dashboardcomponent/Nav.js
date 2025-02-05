"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { BsBuildingsFill } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { IoMenu } from "react-icons/io5";
// import { fetchNotificationByBranch } from "@/lib/NotificationSlice";
import Cookies from "js-cookie";

export default function Navbarr() {
  const router = useRouter();
  const dispatch = useDispatch();
 

  const { user } = useSelector((state) => state.auth);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isdelete, Setisdelete] = useState(false);

  
  return (
    <>
      <Navbar isBordered maxWidth="full">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4 hidden md:flex lg:flex">
            <p>Hello Admin!</p>
          </NavbarBrand>
          <NavbarBrand className="-ml-4 block md:hidden lg:hidden">
            <IoMenu size={24} />
          </NavbarBrand>
        </NavbarContent>

       
      </Navbar>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                No Branches Found
              </ModalHeader>
              <ModalBody className="flex flex-col text-center">
                <p>Please select a branch to proceed.</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                <Button
                  onPress={onClose}
                  className="bg-[#004AAD] text-white"
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
}
