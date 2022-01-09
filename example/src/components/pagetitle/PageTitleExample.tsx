import React from 'react'
import {PageTitle} from "wagtail-rest-pack";
import {Component} from "../Component";

export function PageTitleExample() {
  return <>
    <Component name={"PageTitle"}>
      <PageTitle title={"Velký nadpis článku!"}
                 variant={"h1"}
                 subTitle={"xxx"}
                 showSubtitle={true}
                 last_published_at={9123456789}
      />
    </Component>
    <Component name={"PageTitle"}>
      <PageTitle title={"Velký nadpis článku h2!"}
                 variant={"h2"}
                 subTitle={"xxx"}
                 showSubtitle={true}
                 last_published_at={9123456789}
      />
    </Component>
  </>
}
