import React from 'react';
import useHubspotChat from "../hooks/useHubspotChat";

export const withSupportChat = (Component) => {
    return (props) => {

        // The id of the portal
        const PORTAL_ID = '26233553';

        const {activeConversation, closeHandler, openHandler, hasLoaded } = useHubspotChat(PORTAL_ID);

        return <Component supportChatActiveConversation={activeConversation}
                          supportChatCloseHandler={closeHandler}
                          supportChatOpenHandler={openHandler}
                          supportChatHasLoaded={hasLoaded}
                          {...props}></Component>
    }
}