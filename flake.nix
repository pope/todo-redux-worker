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
    { gitignore
    , systems
    , treefmt-nix
    , nixpkgs
    , ...
    }:
    let
      eachSystem = f: nixpkgs.lib.genAttrs (import systems) (system: f
        (import nixpkgs {
          inherit system;
          config = { };
        })
      );
      treefmtEval = eachSystem (pkgs: treefmt-nix.lib.evalModule pkgs (_: {
        projectRootFile = "flake.nix";
        programs = {
          deadnix.enable = true;
          nixpkgs-fmt.enable = true;
          statix.enable = true;
        };
      }));
    in
    {
      packages = eachSystem (pkgs:
        rec {
          todo = pkgs.buildNpmPackage {
            name = "todo";
            srcs = gitignore.lib.gitignoreSource ./.;
            npmDepsHash = "sha256-9U9w4mPw9sZYchEBymfEvFqLwUhOptgAYA8PIzNCLHE=";
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
          buildInputs = with pkgs;[
            esbuild
            gnumake
            nodePackages.prettier
            nodejs_latest
            npm-check
            prefetch-npm-deps
            prettierd
            treefmtEval.${system}.config.build.wrapper
            typescript
          ];
        };
      });

      formatter = eachSystem (pkgs: treefmtEval.${pkgs.system}.config.build.wrapper);

      checks = eachSystem (pkgs: {
        formatting = treefmtEval.${pkgs.system}.config.build.wrapper;
      });
    };
}
