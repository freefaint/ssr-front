FROM docker.repo.severstal.severstalgroup.com/svs_aspnet:6.0-ubuntu

ARG GIT_COMMIT_SHORT
LABEL app.revision=$GIT_COMMIT_SHORT

USER svsuser

ENV TZ=Europe/Moscow \
    ASPNETCORE_URLS=http://+:5000

WORKDIR /app
COPY ./artifacts/publish .
COPY ./smartapp_files ./smartapp_files
EXPOSE 5000
ENTRYPOINT ["dotnet", "Bivgroup.YagokSSR.SmartApp.dll"]
