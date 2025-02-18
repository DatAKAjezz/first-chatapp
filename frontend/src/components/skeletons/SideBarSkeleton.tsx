import { HStack, Skeleton, Stack } from "@chakra-ui/react";
import { Users, UsersIcon } from "lucide-react";
import { SkeletonCircle } from "../ui/skeleton";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full box-content justify-evenly w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
      style={{ paddingInline: "10px" }}
    >
      <div className="flex gap-2">
        <UsersIcon />
        <p>Contacts</p>
      </div>{" "}
      {skeletonContacts.map((_, index) => (
        <HStack gap="5" key={index}>
          <SkeletonCircle size="12" />
          <Stack flex="1">
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
          </Stack>
        </HStack>
      ))}
    </aside>
  );
};

export default SidebarSkeleton;
