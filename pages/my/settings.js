import React from "react"

// Local components
import SideNav from "../../components/settings/SideNav"
import SettingsForm from "../../components/settings/SettingsForm"

// export async function getServerSideProps(ctx) {

// }

const ProfileSettingsPage = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 justify-center bg-gray-50">
        <div className="max-w-screen-xl mx-auto w-full relative z-10 flex py-8 px-4 sm:px-6 lg:px-8">
          <SideNav />
          <SettingsForm />
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsPage
