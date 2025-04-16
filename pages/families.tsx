import FamilyLink from "@/components/FamilyLink/FamilyLink";
import { getFamiliesArray, getRootFamiliesArray } from "@/data";
import ballS from "@/styles/Ball.module.css";
import s from "@/styles/FamiliesPage.module.css";
import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";
import React, { useState, useMemo } from "react";

const FamiliesPage: NextPage = () => {
  const families = getFamiliesArray();
  const rootFamilies = getRootFamiliesArray();

  const [query, setQuery] = useState("");
  const filteredFamilies = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return families.filter(family =>
      [family.lastName, family.firstName, family.patronym]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, families]);

  return (
    <div className={s.pageContainer}>
      <div className={s.content}>
        <div className={s.descriptionContainer}>
          <div className={classNames(s.titleContainer, s.descriptionItem)}>
            <div className={s.logoContainer}>
              <Image src="/LogoBig.png" width={120} height={110} alt="Family Tree" />
            </div>
            <span className={s.logoTitle}>Families</span>
          </div>
        </div>
        <div className={classNames(s.titleContainer)}>
          <div className={s.subTitle}>
          <span><label>Search for the branch </label></span>
          <input
            type="text"
            placeholder="Type your name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={s.searchBox}
          />
          </div>
        </div>
        <div className={classNames(s.titleContainer, s.descriptionItem)}>
          {query && (
            <div className={s.searchResults}>
              {filteredFamilies.length > 0 ? (
                filteredFamilies.map((family, index) => (
                  <FamilyLink
                    key={index}
                    href={`/tree?root=${family.id}`}
                    familyName={[family.lastName, family.firstName, family.patronym].join(" ")}
                  />
                ))
              ) : (
                <span className={s.noResults}>No branches found.</span>
              )}
            </div>
          )}
        </div>
        <div className={s.familiesContainer}>
          <span className={s.subTitle}>Select from the root</span>
          {rootFamilies
            .map((family, index) => (
            <FamilyLink key={index} href={`/tree?root=${family.id}`} familyName={[family.lastName,family.firstName,family.patronym].join(" ")} />
            ))}
          <br />
        </div>
      </div>
      <div className={s.imageContainer}>
        <div className={ballS.ball1} />
        <div className={ballS.ball2} />
        <div className={ballS.ball3} />
        <div className={ballS.ball4} />
        <div className={ballS.ball5} />
      </div>
    </div>
  );
};

export default FamiliesPage;
