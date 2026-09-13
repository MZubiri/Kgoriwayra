FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Install curl for docker healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files for caching restore layer
COPY ["src/Kgoriwayra.Domain/Kgoriwayra.Domain.csproj", "src/Kgoriwayra.Domain/"]
COPY ["src/Kgoriwayra.Application/Kgoriwayra.Application.csproj", "src/Kgoriwayra.Application/"]
COPY ["src/Kgoriwayra.Infrastructure/Kgoriwayra.Infrastructure.csproj", "src/Kgoriwayra.Infrastructure/"]
COPY ["src/Kgoriwayra.WebApi/Kgoriwayra.WebApi.csproj", "src/Kgoriwayra.WebApi/"]

RUN dotnet restore "src/Kgoriwayra.WebApi/Kgoriwayra.WebApi.csproj"

# Copy full source and build
COPY . .
WORKDIR "/src/src/Kgoriwayra.WebApi"
RUN dotnet build "Kgoriwayra.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Kgoriwayra.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create directory for uploads
RUN mkdir -p /app/uploads

ENTRYPOINT ["dotnet", "Kgoriwayra.WebApi.dll"]
