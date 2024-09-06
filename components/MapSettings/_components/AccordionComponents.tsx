"use client";

import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

export const AccordionTrigger = React.forwardRef(
    ({ children, className, ...props }: any, forwardedRef) => (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={classNames(
                    "cursor-pointer group flex h-[45px] flex-1  items-center justify-between px-2 leading-none  outline-none",
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon
                    className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden
                />
            </Accordion.Trigger>
        </Accordion.Header>
    )
);

export const AccordionContent = React.forwardRef(
    ({ children, className, ...props }: any, forwardedRef) => (
        <Accordion.Content
            className={classNames(
                "text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]",
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="">{children}</div>
        </Accordion.Content>
    )
);
