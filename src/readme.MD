If info.plist not found

ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0"

Xcode 10: A valid provisioning profile for this executable was not found

I was struggling with this today, it was super frustrating. For now, just go into "File" > "Project Settings..." (or in some cases "Workspace Settings...") and then select "Legacy Build System" from the "Build System" dropdown.