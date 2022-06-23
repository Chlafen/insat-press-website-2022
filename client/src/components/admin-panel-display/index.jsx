import React, { useContext, useEffect, useState } from 'react'
import AdminPanelCommentsDisplay from './admin-panel-comments-display';
import AdminPanelLogsDisplay from './admin-panel-logs-display';
import AdminPanelPostsDisplay from './admin-panel-posts-display';
import AdminPanelSettingsDisplay from './admin-panel-settings-display';
import AdminPanelUserDisplay from './admin-panel-users-display';

export default function AdminPanelDisplay({selectedPageIndex}) {
    return (
        <>
            {
                (()=>{
                    switch(selectedPageIndex){
                        case 0:{
                            return <></>;
                        }
                        case 1:{
                            return <AdminPanelUserDisplay />;
                        }
                        case 2:{
                            return <AdminPanelPostsDisplay /> ;
                        }
                        case 3:{
                            return <AdminPanelCommentsDisplay /> ;
                        }
                        case 4:{
                            return <AdminPanelLogsDisplay /> ;
                        }
                        case 5:{
                            return <AdminPanelSettingsDisplay /> ;
                        }
                    }
                })()
            }
        </>
    );
}