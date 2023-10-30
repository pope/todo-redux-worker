{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    nix-formatter-pack = {
      url = "github:Gerschtli/nix-formatter-pack";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs =
    { gitignore
    , nix-formatter-pack
    , nixpkgs
    , ...
    }:
    let
      supportedSystems = [
        "x86_64-darwin"
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      packages = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
          todo = pkgs.buildNpmPackage {
            name = "todo";
            srcs = gitignore.lib.gitignoreSource ./.;
            npmDepsHash = "sha256-HzOdMX7VchUVJqk5gonDQnN3y2ztlpn2oTVhpr8w9io=";
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
        in
        {
          inherit todo;
          default = todo;
        });
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        with pkgs;
        {
          default = mkShell {
            buildInputs = [
              esbuild
              gnumake
              nodePackages.prettier
              nodejs
              prefetch-npm-deps
              prettierd
              typescript
            ];
          };
        });

      formatter = forAllSystems (system:
        nix-formatter-pack.lib.mkFormatter {
          pkgs = nixpkgs.legacyPackages.${system};
          config.tools = {
            deadnix.enable = false;
            nixpkgs-fmt.enable = true;
            statix.enable = true;
          };
        }
      );
    };
}
