"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t("company")}</h3>
            <p className="text-sm text-gray-500">
              {t("companyDescription")}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{t("resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-gray-500 hover:text-gray-900">
                  {t("resources")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-gray-500 hover:text-gray-900">
                  {t("news")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{t("privacy")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Robo AI. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  )
}


