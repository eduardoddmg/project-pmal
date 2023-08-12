import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const Navigation = () => {
  const router = useRouter();
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.split("?")[0]);

  return (
    <Breadcrumb pt={5} px={8} separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => router.push("/")}>Home</BreadcrumbLink>
      </BreadcrumbItem>

      {pathSegments.map((segment, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink
            onClick={() =>
              router.push(`/${pathSegments.slice(0, index + 1).join("/")}`)
            }
          >
            {segment}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
