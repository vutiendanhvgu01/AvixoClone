#
# EXAMPLE OF MULTISTAGE BUILD FOR MONOREPOS
#
# @link https://github.com/belgattitude/nextjs-monorepo-example
#

###################################################################
# Stage 1: Install all workspaces (dev)dependencies               #
#          and generates node_modules folder(s)                   #
# ----------------------------------------------------------------#
# Notes:                                                          #
#   1. this stage relies on buildkit features                     #
#   2. depend on .dockerignore, you must at least                 #
#      ignore: all **/node_modules folders and .yarn/cache        #
###################################################################

ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.17


FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS deps
RUN apk add --no-cache rsync

WORKDIR /workspace-install

COPY yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

# Specific to monerepo's as docker COPY command is pretty limited
# we use buidkit to prepare all files that are necessary for install
# and that will be used to invalidate docker cache.
#
# Files are copied with rsync:
#
#   - All package.json present in the host (root, apps/*, packages/*)
#   - All schema.prisma (cause prisma will generate a schema on postinstall)
#
RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
          --exclude='.yarn' \
          --exclude='node_modules' \
          --exclude='*/node_modules' \
          --include='package.json' \
          --include='*/' --exclude='*' \
          /docker-context/ /workspace-install/;

# @see https://www.prisma.io/docs/reference/api-reference/environment-variables-reference#cli-binary-targets
# ENV PRISMA_CLI_BINARY_TARGETS=linux-musl

#
# To speed up installations, we override the default yarn cache folder
# and mount it as a buildkit cache mount (builkit will rotate it if needed)
# This strategy allows to exclude the yarn cache in subsequent docker
# layers (size benefit) and reduce packages fetches.
#
# PS:
#  1. Cache mounts can be used in CI (github actions)
#  2. To manually clear the cache
#     > docker builder prune --filter type=exec.cachemount
#
# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673

# RUN yarn install --immutable --inline-builds

RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
    YARN_CACHE_FOLDER=/root/.yarn3-cache \
    yarn install --immutable --inline-builds

###################################################################
# Stage 2: Build the app                                          #
###################################################################

FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder
ENV NODE_ENV=production
# ENV NEXTJS_IGNORE_ESLINT=1
# ENV NEXTJS_IGNORE_TYPECHECK=0
ARG APP_NAME=report-portal
WORKDIR /app

COPY . .
COPY --from=deps /workspace-install ./
COPY --from=deps /workspace-install/node_modules ./node_modules

# Optional: if the app depends on global /static shared assets like images, locales...


# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673
# RUN yarn plugin import workspace-tools
# RUN SKIP_POSTINSTALL=1 yarn workspaces focus report-portal --production

RUN yarn workspace ${APP_NAME} build && yarn workspace share-components build
###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner

WORKDIR /app
ARG APP_NAME=report-portal
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/${APP_NAME}/next.config.js \
                    /app/apps/${APP_NAME}/package.json \
                    ./apps/${APP_NAME}/

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next ./apps/${APP_NAME}/.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static

USER nextjs
ENV PORT 13041
EXPOSE ${PORT}/tcp

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "workspace", "report-portal", "start"]
