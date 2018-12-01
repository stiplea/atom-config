#include <fstream>
#include <iostream>

using namespace std;

ifstream f("in.in");
ofstream g("in.out");

int main() {
  int a, b;
  f >> a >> b;
  g << a * b << '\n';

  return 0;
}
