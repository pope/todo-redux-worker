{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.05-small";
    systems.url = "github:nix-systems/default-linux";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      gitignore,
      nixpkgs,
      self,
      systems,
      treefmt-nix,
      ...
    }:
    let
      eachSystem =
        f:
        nixpkgs.lib.genAttrs (import systems) (
          system:
          f (
            import nixpkgs {
              inherit system;
              config = { };
            }
          )
        );
      treefmtEval = eachSystem (
        pkgs:
        treefmt-nix.lib.evalModule pkgs (_: {
          projectRootFile = "flake.nix";
          programs = {
            deadnix.enable = true;
            nixfmt.enable = true;
            prettier.enable = true;
            statix.enable = true;
          };
        })
      );
    in
    {
      packages = eachSystem (pkgs: rec {
        todo = pkgs.buildNpmPackage {
          name = "todo";
          srcs = gitignore.lib.gitignoreSource ./.;
          npmDepsHash = "sha256-EmrolIL8voNiCieKR84mllFd03Okyz+vngBfP4hT9fM=";
          nativeBuildInputs = with pkgs; [
            esbuild
            gnumake
            typescript
          ];
          installPhase = ''
            runHook preInstall
            mkdir -p $out
            cp -r dist $out/todo
            runHook postInstall
          '';
        };

        default = todo;
      });

      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodePackages.typescript-language-server
            npm-check
            prefetch-npm-deps
            treefmtEval.${stdenv.hostPlatform.system}.config.build.wrapper
          ];

          inputsFrom = [ self.packages.${pkgs.stdenv.hostPlatform.system}.todo ];
        };
      });

      formatter = eachSystem (pkgs: treefmtEval.${pkgs.stdenv.hostPlatform.system}.config.build.wrapper);

      checks = eachSystem (pkgs: {
        formatting = treefmtEval.${pkgs.stdenv.hostPlatform.system}.config.build.wrapper;
      });
    };
}
